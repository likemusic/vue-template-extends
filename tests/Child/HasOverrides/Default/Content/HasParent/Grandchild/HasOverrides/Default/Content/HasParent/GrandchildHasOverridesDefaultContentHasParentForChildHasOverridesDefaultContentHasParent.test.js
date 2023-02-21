import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent
    from "./GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. ChildHasOverridesDefaultContentHasParent default. GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Base default. ChildHasOverridesDefaultContentHasParent default. GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
