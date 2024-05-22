import React, {ComponentRef, ComponentType, forwardRef} from 'react';

type Defaultize<P extends {}, Q extends Partial<P>> = Omit<P, keyof Q> &
    Partial<Pick<P, keyof Q & keyof P>>;

export type PropsOf<
    C extends | keyof React.JSX.IntrinsicElements
        | React.JSXElementConstructor<any>,
> = React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

export function withAttrs<P extends {}, Q extends Partial<P>>(
    Component: ComponentType<P>,
    propsFactory: Q | ((props: PropsOf<ComponentType<P>>) => Q),
) {
    return forwardRef<ComponentRef<ComponentType<P>>, Defaultize<P, Q>>(
        (props, ref) => {
            return (
                <Component
                    {...(props as P)}
                    {...(typeof propsFactory === 'function'
                        ? propsFactory(props as P)
                        : propsFactory)}
                    ref={ref}
                />
            );
        },
    );
}
