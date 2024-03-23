<template>
  <footer p="y15 x15" flex="~ col gap5">
    <div op50 text-sm items-center>
      <p>© {{ new Date().getFullYear() }} Surya Srikanth Attili. All rights reserved.</p>
    </div>
    <!--<div grid="~ cols-minmax-10rem xs:cols-2 sm:cols-3" gap5 items-center> -->
    <div grid="~ cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-5 xs:cols-2 sm:cols-3" items-center>
      <a text-sm target="_blank" href="/legal/privacy" title="Privacy Policy" rel="noopener" n-link-text>
        Privacy
      </a>
      <a text-sm target="_blank" href="/legal/termsofuse" title="Terms of Use" rel="noopener" n-link-text>
        Terms of use
      </a>
      <a text-sm target="_blank" href="/legal/cookie-policy" title="Cookie Policy" rel="noopener" n-link-text>
        Cookie
      </a>
      <a text-sm target="_blank" href="/legal/corporate-information" title="About Us" rel="noopener" n-link-text>
        About us
      </a>
      <ExternalLinks
        :links="{
          twitter_id: 'nuxt_js',
          github_id: 'nuxt/movies',
        }"
      >
      </ExternalLinks>
    </div>
    <div flex="~ row gap30" items-center>
      <LanguageSwitcher/>
    </div>
  </footer>
</template>
