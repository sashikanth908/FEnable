const I18n = window.I18n || {};
I18n.fallbacks = true;

// Simplified Chinese has no plural form.
// OneSky gives us this as all plural forms with only the `other` key.
// (See plurals.rb for backend equivalent)
I18n.pluralization = I18n.pluralization || {};
I18n.pluralization['zh-CN'] = function () {
  return ['other'];
};

module.exports = I18n;
