   /* File: newrelic.js */
   'use strict'
   /**
    * New Relic agent configuration.
    *
    * See lib/config/default.js in the agent distribution for a more complete
    * description of configuration variables and their potential values.
    */
   exports.config = {
     app_name: ['fastify-reality-tv-voting'],
     license_key: process.env.NEW_RELIC_API_KEY,

     
     distributed_tracing: {
      /**
       * Enables/disables distributed tracing.
       *
       * @env NEW_RELIC_DISTRIBUTED_TRACING_ENABLED
       */
      enabled: true,
    },
   }