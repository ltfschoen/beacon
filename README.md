## Beacon

**Objective:** Beacon chain visualisation

### Develop Environment

Clone the repository, install Yarn and Node.js, and then run the following in terminal:
```
yarn &&
yarn run dev
```

* Go to http://localhost:3000

### Deploy to Heroku

* Start
```
heroku login
heroku apps:create <NAME>
git push -f heroku master
heroku local web
heroku ps:scale web=1:free
heroku ps
heroku open
heroku logs --tail
heroku restart
```

* Stop
```
heroku ps:stop web
```

* Scale up dynos
```
heroku ps:scale web=2:standard-2x
```

* Scale down dynos
```
heroku ps:scale web=1:free
```

* Fees - https://devcenter.heroku.com/articles/usage-and-billing
* Scaling help - https://devcenter.heroku.com/articles/scaling

## Troubleshooting

* If you get an unknown type error, then it may be necessary to update polkadot-js/api dependency in package.json, since it is constantly evolving.

* To kill a frozen process
```
ps -ef | grep node
kill -9 <PROCESS_ID>
```

### References:

* [Migrate to SSR](https://dev.to/kedar9/creating-a-node-app-with-react-webpack-4-babel-7-express-and-sass-3mae)