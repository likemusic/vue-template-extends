# vue-template-extends

The loader allows you to extend templates for SFC by overriding slots.

## Installation

Install the loader by running:

```bash
npm npm i --save vue-template-extends
```

Add loader to Webpack config in `module.rules`:

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                resourceQuery: /blockType=template-extends/,
                loaders: ['vue-template-extends']
            }
        ]
    }
}
```

## Usage

For example, your base component has template:

```xml
<!-- BaseComponent.vue -->
<template>
    <div>
        <slot name="header">Base header</slot>

        Some common content

        <slot>BaseComponent</slot>
    </div>
</template>
```

### Override slot content

To override slots content from base component, you must create in child component file custom block `<template-extends>`
with attribute `base` that contains a relative path to base component template (without file extension). This block
should contain `<slot>` tags with optional `name` attribute. Default name for slots is `default` (like in VueJs).

```xml
<!-- ChildComponent.vue -->
<template-extends base="./BaseComponent">
    <slot name="header">Child header</slot>
    <slot>ChildComponent</slot>
</template-extends>
```

Result template for ChildComponent would be:

```xml

<template>
    <div>
        <slot name="header">Child header</slot>

        Some common content

        <slot>ChildComponent</slot>
    </div>
</template>
```

### Override whole slot

To override whole slots `<slot>` tags in `<template-extends>` custom block must have attribute `replace` (without value
or with any value except `false`).

To use parent slot value in replaced slot add slot with attribute `parent` (without value or with any value
except `false`).

By this way you could wrap/decorate parent component's slots . Let's add to BaseComponent after default slot the new one slot with name "footer".

```html
<!-- ChildComponentWithFooter.vue -->
<template-extends base="./BaseComponent">
    <slot replace>
        <slot parent></slot>
        <slot name="footer">Footer</slot>
    </slot>
</template-extends>
```

Result template for ChildComponentWithFooter would be:

```xml
<template>
    <div>
        <slot name="header">Base header</slot>

        Some common content

        <slot>BaseComponent</slot>
        <slot name="footer">Footer</slot>
    </div>
</template>
```

## Implementation details

When loader used for `<template-extends>` custom block, it gets evaluated (recursively by `base`-attribute) template
string from parent component defined in `base` attribute. Then it replaces `<slot>`-tags content in parent template
string with related (matched by `name`-attributes) `<slot>`-tags content in `<template-extends>`-block. All this happens
on the server during build.

Then on the client-side in user's browser, evaluated template compiled by `Vue.compile()` to renders functions (`render`
and `staticRenderFns`), that is sets as component options.

## Motivation

In one of my projects I have some complex forms with small differences in some places. Unfortunately VueJs by default
don't allow extends a template's blocks (
like [@yeld/@extends/@section in Laravel Blade](https://laravel.com/docs/master/blade#extending-a-layout)).

Possible solutions that I know is:

- **Use template pre-processor for custom template engine, that supports extends templates**:
    - **[Pug](https://vue-loader.vuejs.org/guide/pre-processors.html#pug)** - Supported out of the box bu VueJs. But I
      don't like this solution because I don't wont to change all my templates to Pug-syntax just for extend some
      templates.
    - **[Nunjucks](https://github.com/ryanhornberger/nunjucks-html-loader)** - I started to try it, but not complete,
      because this loader has been created.
- **Use custom loaders**:
    - **[Vue Slot Loader](https://github.com/SasanFarrokh/vue-slot-loader)** - It has tricky implementation (generated
      slots) and
      therefore [issues for many use cases](https://github.com/SasanFarrokh/vue-slot-loader/issues/5). [I have tried to improve this implementation](https://github.com/likemusic/vue-slot-loader/tree/inheritable),
      but still has many issues in real world usage.
    - **[vue-inheritance-loader](https://github.com/mrodal/vue-inheritance-loader)** - The main disadvantage is that
      this module replaces default `vue-loader`. Also, I
      have [an issue](https://github.com/mrodal/vue-inheritance-loader/issues/17) to use it with Laravel Mix.

In fact this loader inspired by [Vue Slot Loader](https://github.com/SasanFarrokh/vue-slot-loader) and grown from the
last (thanks to [@SasanFarrokh](https://github.com/SasanFarrokh/)).
