<template>
  <!--grid="~ cols-minmax-10rem lg:cols-minmax-15rem" gap4 p8-->

  <footer p="y15 x15" flex="~ col gap5">
    <div op50 text-sm items-center>
      <p>&copy; {{ new Date().getFullYear() }} Surya Srikanth Attili. All rights reserved.</p>
    </div>
    <div grid="~ cols-minmax-10rem" gap10 items-center>
      <a text-sm target="_blank" href="/legal/privacy" title="Privacy Policy" rel="noopener" n-link-text>
          Privacy policy
      </a>
      <a text-sm target="_blank" href="/legal/termsofuse" title="Privacy Policy" rel="noopener" n-link-text>
          Terms and Conditions
      </a>
      <a text-sm target="_blank" href="/legal/cookie-policy" title="Privacy Policy" rel="noopener" n-link-text>
        Cookie Policy
      </a>
      <a text-sm target="_blank" href="/legal/corporate-information" title="Privacy Policy" rel="noopener" n-link-text>
          Corporate Information
      </a>
    </div>
    
    <div flex="~ row gap15" items-center>
      <ExternalLinks
        :links="{
          twitter_id: 'nuxt_js',
          github_id: 'nuxt/movies',
        }"
      >
      </ExternalLinks>
      <LanguageSwitcher/>
    </div>

  </footer>
</template>
