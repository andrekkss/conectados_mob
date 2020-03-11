import 'package:conectados_mob/Translations.dart';
import 'package:flutter/material.dart';

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              ButtonTheme(
                  minWidth: 350,
                  child: RaisedButton(
                    child: Text(getString(context, "welcome_login_text")),
                    textColor: Colors.white,
                    onPressed: () {
                      // Navigate to the second screen using a named route.
                      Navigator.pushNamed(context, '/second');
                    },
                  )
              ),
              const SizedBox(height: 8),
              ButtonTheme(
                  minWidth: 350,
                  child: RaisedButton(
                    child: Text(getString(context, "welcome_register_text")),
                    textColor: Colors.white,
                    color: Colors.grey,
                    onPressed: () {
                      // Navigate to the second screen using a named route.
                      Navigator.pushNamed(context, '/second');
                    },
                  )
              ),
            ],
          )
      ),
    );
  }
}