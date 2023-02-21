import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent from "./GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^ChildHasOverridesDefaultContentNoParent default. GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^ChildHasOverridesDefaultContentNoParent default. GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
