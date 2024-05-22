import React, {ComponentRef, ComponentType, forwardRef} from 'react';
import {PropsOf, Theme, useTheme} from '@emotion/react';

type Defaultize<P extends {}, Q extends Partial<P>> = Omit<P, keyof Q> &
    Partial<Pick<P, keyof Q & keyof P>>;

export function withEmotionAttrs<P extends {}, Q extends Partial<P>>(
    Component: ComponentType<P>,
    propsFactory: Q | ((props: PropsOf<ComponentType<P>>, theme: Theme) => Q),
) {
    return forwardRef<ComponentRef<ComponentType<P>>, Defaultize<P, Q>>(
        (props, ref) => {
            const theme = useTheme();

            return (
                <Component
                    {...(props as P)}
                    {...(typeof propsFactory === 'function'
                        ? propsFactory(props as P, theme)
                        : propsFactory)}
                    ref={ref}
                />
            );
        },
    );
}
