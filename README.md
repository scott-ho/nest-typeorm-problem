You need to create the databases and users specified in ormconfig.json

There are actually two problems here:

1. using `forRootAsync()` -- see [user.e2e-spec.ts](./e2e/user.e2e-spec.ts)
2. using `forRoot()` with options object with `name` field -- see [user.e2e-spec.ts](./e2e/user2.e2e-spec.ts)