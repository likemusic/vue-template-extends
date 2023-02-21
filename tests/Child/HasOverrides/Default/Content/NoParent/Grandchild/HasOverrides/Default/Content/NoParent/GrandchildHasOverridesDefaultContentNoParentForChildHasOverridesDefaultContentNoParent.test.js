import {render} from '@testing-library/vue';
import '@testing-library/jest-dom';
import GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent from "./GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent.vue";

test('No overrides', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent);
    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent default. Base custom.$/);
})

test('Has overrides: default', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Base custom.$/);
})

test('Has overrides: custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent, {
        slots: {
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent default. Overridden custom.$/);
})

test('Has overrides: default, custom', async () => {
    const {getByTestId} = render(GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent, {
        slots: {
            default: "Overridden default.",
            custom: "Overridden custom.",
        },
    })

    const component = getByTestId('component')
    expect(component).toHaveTextContent(/^Overridden default. Overridden custom.$/);
})
