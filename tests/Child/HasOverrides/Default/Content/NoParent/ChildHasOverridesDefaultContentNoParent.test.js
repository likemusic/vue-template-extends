import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import ChildHasOverridesDefaultContentNoParent from "./ChildHasOverridesDefaultContentNoParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentNoParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^ChildHasOverridesDefaultContentNoParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentNoParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^ChildHasOverridesDefaultContentNoParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(ChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
