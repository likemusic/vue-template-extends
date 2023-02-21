import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildNoOverridesForChildNoOverrides from "./GrandchildNoOverridesForChildNoOverrides.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildNoOverrides);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildNoOverrides, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('With override: custom', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildNoOverrides, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. Overridden custom.$/);
})

test('With override: default, custom', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildNoOverrides, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
