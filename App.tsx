const ensureURLProtocolPolyfill = () => {
  if (typeof URL === 'undefined') {
    return;
  }

  try {
    const testUrl = new URL('https://example.com');
    void testUrl.protocol;
    return;
  } catch (error) {
    // Hermes throws "URL.protocol is not implemented" when the getter is accessed.
  }

  Object.defineProperty(URL.prototype, 'protocol', {
    configurable: true,
    enumerable: true,
    get() {
      const href = this.href;
      const protocolMatch = href.match(/^([a-z0-9.+-]+:)/i);
      return protocolMatch ? protocolMatch[1] : '';
    },
    set(value: string) {
      const normalized = value.endsWith(':') ? value : `${value}:`;
      const href = this.href;
      const withoutProtocol = href.replace(/^([a-z0-9.+-]+:)/i, '');
      this.href = `${normalized}${withoutProtocol.startsWith('//') ? withoutProtocol : `//${withoutProtocol}`}`;
    },
  });
};

ensureURLProtocolPolyfill();

import StorybookUIRoot from './.storybook';

export default StorybookUIRoot;
