import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import ChildNoOverrides from "./ChildNoOverrides.vue";

test('No overrides', async () => {
    const {getByTestId} = render(ChildNoOverrides);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(ChildNoOverrides, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(ChildNoOverrides, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(ChildNoOverrides, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
