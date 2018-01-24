# User API in GraphQL POC

Proof of Concept of exposing a legacy system (using a Mysql database)

## Development

Install all dependencies:

```
npm install
```

Point it in the direction of your legacy database by copying config/config.json.example to config/config.json and filling in the appropriate credentials (I have a non-standard port and localhost because I was tunneling to a remote dev box).

More details can be found in the sequelize docs: http://docs.sequelizejs.com/manual/installation/getting-started

A repl is often useful for this stuff, here's an example session importing models and doing queries

```
$ node
> var models = require './models';
undefined
> models.user.findOne({where: {id: 3800798}}).then(user=> user.getSubscriptionProfiles({include: [{model: models.subscription}], raw: true}).then(subs=>console.log(subs)));
Promise {
  _bitField: 0,
  _fulfillmentHandler0: undefined,
  _rejectionHandler0: undefined,
  _promise0: undefined,
  _receiver0: undefined }
> Executing (default): SELECT `entity_id` AS `id`, `email`, `group_id` AS `groupId` FROM `customer_entity` AS `user` WHERE `user`.`entity_id` = 3800798;
Executing (default): SELECT `subscriptionProfile`.`id`, `subscriptionProfile`.`customer_id` AS `customerId`, `subscriptionProfile`.`subscription_vertical_id` AS `subscriptionVerticalId`, `subscriptionProfile`.`shipping_address_id` AS `shippingAddressId`, `subscriptionProfile`.`is_paused` AS `isPaused`, `subscriptionProfile`.`customer_id`, `subscriptions`.`id` AS `subscriptions.id`, `subscriptions`.`order_item_id` AS `subscriptions.orderItemId`, `subscriptions`.`subscription_type` AS `subscriptions.subscriptionType`, `subscriptions`.`status` AS `subscriptions.status`, `subscriptions`.`next_ship_date` AS `subscriptions.nextShipDate`, `subscriptions`.`boxes_remaining` AS `subscriptions.boxesRemaining`, `subscriptions`.`created_at` AS `subscriptions.createdAt`, `subscriptions`.`updated_at` AS `subscriptions.updatedAt`, `subscriptions`.`customer_subscription_profile_id` AS `subscriptions.customerSubscriptionProfileId`, `subscriptions`.`shipping_frequency` AS `subscriptions.shippingFrequency`, `subscriptions`.`customer_subscription_profile_id` AS `subscriptions.customer_subscription_profile_id` FROM `customer_subscription_profile` AS `subscriptionProfile` LEFT OUTER JOIN `subscriptions` AS `subscriptions` ON `subscriptionProfile`.`id` = `subscriptions`.`customer_subscription_profile_id` WHERE `subscriptionProfile`.`customer_id` = 3800798;
[ { id: 3497958,
    customerId: 3800798,
    subscriptionVerticalId: 1,
    shippingAddressId: 5563656,
    isPaused: 0,
    customer_id: 3800798,
    'subscriptions.id': 3977325,
    'subscriptions.orderItemId': 11098259,
    'subscriptions.subscriptionType': 3,
    'subscriptions.status': 1,
    'subscriptions.nextShipDate': '2017-10-18',
    'subscriptions.boxesRemaining': 1,
    'subscriptions.createdAt': 2017-10-18T21:07:07.000Z,
    'subscriptions.updatedAt': 2017-10-18T21:07:07.000Z,
    'subscriptions.customerSubscriptionProfileId': 3497958,
    'subscriptions.shippingFrequency': 1,
    'subscriptions.customer_subscription_profile_id': 3497958 } ]

```

Once you've made sure the Sequelize stuff is working, the web server is simple enough:


```
npm start
# go to localhost:3000/graphqli
```

## References

- Based on this tutorial: https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
- Sequelize: http://docs.sequelizejs.com/manual/installation/usage.html
- Apollo docs: https://www.apollographql.com/docs/apollo-server/
- General GraphQL docs: https://www.howtographql.com/graphql-js/1-getting-started/

