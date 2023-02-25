import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import ChildHasOverridesDefaultFullHasParent from "./ChildHasOverridesDefaultFullHasParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultFullHasParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. ChildHasOverridesDefaultFullHasParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultFullHasParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. ChildHasOverridesDefaultFullHasParent default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultFullHasParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. ChildHasOverridesDefaultFullHasParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultFullHasParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. ChildHasOverridesDefaultFullHasParent default. Overridden custom.$/);
})
