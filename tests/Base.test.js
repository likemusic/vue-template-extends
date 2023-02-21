import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import Base from "./Base.vue";

test('No overrides', async () => {
    const {getByTestId} = render(Base);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(Base, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(Base, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(Base, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
