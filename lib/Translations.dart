import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';

class Translations {
  final Locale locale;
  Map<String, String> _localizedStrings;

  Translations(this.locale);

  static const LocalizationsDelegate<Translations> delegate = _TranslationsDelegate();

  static Translations of(BuildContext context) {
    return Localizations.of(context, Translations);
  }

  Future load() async {
    String fileContent = await rootBundle.loadString("locale/${locale.languageCode}_${locale.countryCode}.json");
    Map<String, dynamic> map = json.decode(fileContent);
    _localizedStrings = map.map((k, v) {
      return MapEntry(k.toString(), v.toString());
    });
  }

  String translate(String key) {
    return _localizedStrings[key];
  }

}

String getString(BuildContext context, String key) => context != null ? (Translations.of(context).translate(key) ?? "") : null;

class _TranslationsDelegate extends LocalizationsDelegate<Translations> {

  const _TranslationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ["pt", "en"].contains(locale.languageCode);
  }

  @override
  Future<Translations> load(Locale locale) async {
    var localizations = Translations(locale);
    await localizations.load();
    return localizations;
  }

  @override
  bool shouldReload(LocalizationsDelegate<Translations> old) => false;

}