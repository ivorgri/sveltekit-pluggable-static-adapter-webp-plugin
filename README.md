# sveltekit-pluggable-static-adapter-webp-plugin
Plugin for generating Webp images from a static Sveltekit build. To be used with [@ivorgri/sveltekit-pluggable-static-adapter](https://www.npmjs.com/package/@ivorgri/sveltekit-pluggable-static-adapter). The function will take all the JPG/JPEG/PNG files it can find, and convert those to WEBP files. This option should be used in conjunction with a specific implementation for a component. It should convert the existing URL for an image to a WEBP variant. When running this in a development environment, without having access to the WEBP file, a condition is added which checks if a WEBP source set should be used. Make sure to change this when running the build, so the sourceset is added to the result.

How to call the function:

```js
// svelte.config.js

// ...

import convertAssetsToWebp from '@ivorgri/sveltekit-pluggable-static-adapter-webp-plugin';

//...

export default {
	kit: {
		adapter: adapter({
            // ...
            afterPrerenderCallback: async (builder, pages, assets) => {
				await convertAssetsToWebp(builder,assets);
			},
		})
	}
};
```

Possible implementation of a `<picture>` tag:

```ts
<script lang="ts">
    export let imageSrc:string;
    export let imageAlt:string;
    
    let useWebp = import.meta.env.VITE_USE_WEBP; // Or another environment variable that you would like to use

    $: imageSrcWebp = imageSrc.replace(/jpg|jpeg|png/g,"webp");
</script>

<picture>
    {#if useWebp}
        <source srcset="{imageSrcWebp}" type="image/webp"> 
    {/if}
    <img src="{imageSrc}" alt="{imageAlt}">
</picture>
```