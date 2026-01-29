import dynamic from 'next/dynamic'

const componentregistry = {
    "wrapper": dynamic(() => import('../lib-sdui/components/wrapper/component').then(mod => mod.WrapperComponent)),
    "text": dynamic(() => import('../lib-sdui/components/text/component').then(mod => mod.TextComponent)),
    "button": dynamic(() => import('../lib-sdui/components/button/component').then(mod => mod.ButtonComponent)),
    "card": dynamic(() => import('../lib-sdui/components/card/component').then(mod => mod.CardComponent)),
};  