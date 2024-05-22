import React from 'react';
import styled from '@emotion/native';
import {Text} from "react-native-paper"
import {withAttrs} from "scl/src/react/with-attrs";

export const MoviesScreenTitle = withAttrs(styled(Text)`
`, {
    variant: 'titleLarge'
});