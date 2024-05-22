import React, {ComponentRef, ComponentType, forwardRef} from 'react';
import {ClassNames, PropsOf, Theme, ClassNamesContent} from '@emotion/react';

type Defaultize<P extends {}, Q extends Partial<P>> = Omit<P, keyof Q> &
    Partial<Pick<P, keyof Q & keyof P>>;

export function withEmotionClassNames<P extends {}, Q extends Partial<P>>(
    Component: ComponentType<P>,
    propsFactory: (
        props: PropsOf<ComponentType<P>>,
        css: ClassNamesContent['css'],
        cx: ClassNamesContent['cx'],
        theme: Theme,
    ) => Q,
) {
    return forwardRef<ComponentRef<ComponentType<P>>, Defaultize<P, Q>>(
        (props, ref) => {
            return (
                <ClassNames>
                    {({css, cx, theme}) => (
                        <Component
                            {...(props as P)}
                            {...propsFactory(props as P, css, cx, theme)}
                            ref={ref}
                        />
                    )}
                </ClassNames>
            );
        },
    );
}
