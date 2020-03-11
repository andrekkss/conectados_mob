import 'package:conectados_mob/feature/example/ui/firstScreen.dart';
import 'package:conectados_mob/feature/example/ui/secondScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'Translations.dart';

void main() => runApp(ConectadosApp());

class ConectadosApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Conectados',
        initialRoute: '/',
        routes: {
          '/': (context) => FirstScreen(),
          '/second': (context) => SecondScreen()
        },
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      localizationsDelegates: [
        Translations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('en', 'US'),
        const Locale('pt', 'BR'),
      ],
      localeResolutionCallback: (locale, supportedLocales) {
        return supportedLocales.firstWhere((element) => (locale.countryCode == null || element.countryCode == locale.countryCode) && element.languageCode == locale.languageCode,
            orElse: () => supportedLocales.first);
      },
      );
}
