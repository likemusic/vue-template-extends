import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides from "./GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
