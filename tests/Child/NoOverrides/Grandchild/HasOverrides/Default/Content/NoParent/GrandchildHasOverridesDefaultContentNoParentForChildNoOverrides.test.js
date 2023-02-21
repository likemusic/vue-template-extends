import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides from "./GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
