import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildNoOverridesForChildHasOverridesDefaultContentNoParent
    from "./GrandchildNoOverridesForChildHasOverridesDefaultContentNoParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildHasOverridesDefaultContentNoParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^ChildHasOverridesDefaultContentNoParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildHasOverridesDefaultContentNoParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^ChildHasOverridesDefaultContentNoParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildNoOverridesForChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
