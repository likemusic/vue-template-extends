import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent from "./GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
