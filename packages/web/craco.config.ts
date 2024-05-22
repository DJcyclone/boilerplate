import type {CracoConfig} from '@craco/types/dist/config';
import reactNativeWebConfig from "scl/src/react-native-web-config/define-config"

import BundleAnalyzer from 'webpack-bundle-analyzer';

import {getWebpackTools} from "react-native-monorepo-tools";

import CopyPlugin from "copy-webpack-plugin"
import path from "path";
import {DefinePlugin} from "webpack";

const monorepoWebpackTools = getWebpackTools();

const config: CracoConfig = {
    eslint: {
        enable: false,
    },
    typescript: {
        enableTypeChecking: false,
    },
    webpack: {
        configure: (webpackConfig) => {
            // Allow importing from external workspaces.
            monorepoWebpackTools.enableWorkspacesResolution(webpackConfig);
            // Ensure nohoisted libraries are resolved from this workspace.
            monorepoWebpackTools.addNohoistAliases(webpackConfig);

            if (process.env.ANALYZE) {
                webpackConfig.plugins?.push(new BundleAnalyzer.BundleAnalyzerPlugin({}));
            }

            // Grab the existing rule that handles SVG imports
            const fileLoaderRule = webpackConfig.module?.rules?.find(rule =>
                    // @ts-ignore
                    rule.oneOf?.find(ruleOneOf => ruleOneOf.test?.test?.('.svg'))
                ,
            );

            // Modify the file loader rule to ignore *.svg, since we have it handled now.
            // @ts-ignore
            fileLoaderRule.exclude = /\.svg$/i;

            webpackConfig.module?.rules?.push(
                {
                    test: /\.svg$/i,
                    type: 'asset',
                    resourceQuery: /url/, // *.svg?url
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    resourceQuery: {not: [/url/]},
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {typescript: true, dimensions: false, native: true, namedExport: 'default'},
                        }
                    ],
                });

            webpackConfig.plugins?.push(new CopyPlugin({
                patterns: [
                    {
                        context: '..',
                        from: "components/src/resources/translations/**/*",
                        globOptions: {
                            dot: true,
                            gitignore: true,
                            ignore: ["**/*.ts"],
                        },
                    }
                ],
            }),)

            webpackConfig.resolve!.alias!["react-native-config"] = "scl/src/react-native-web-config/config";

            webpackConfig.plugins?.push(
                new DefinePlugin({
                    __DEV__: process.env.NODE_ENV !== "production",
                    ...reactNativeWebConfig(
                        (() => {
                            switch (process.env.CONFIG_TYPE) {
                                case 'prod':
                                    return path.resolve(__dirname, '../../.env.prod')
                                case 'dev':
                                    return path.resolve(__dirname, '../../.env.dev')
                                default:
                                    return path.resolve(__dirname, '../../.env')
                            }
                        })()
                    )
                }))

            return webpackConfig;
        }
    },
    babel: {
        presets: ['@babel/preset-react'],
        plugins: [
            "react-native-web",
        ],
    },
};

module.exports = config;
