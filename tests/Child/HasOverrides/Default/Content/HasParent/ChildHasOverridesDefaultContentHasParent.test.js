import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import ChildHasOverridesDefaultContentHasParent from "./ChildHasOverridesDefaultContentHasParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentHasParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. ChildHasOverridesDefaultContentHasParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentHasParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentHasParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. ChildHasOverridesDefaultContentHasParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentHasParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
