define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/customer-data',
        'mage/url',
        'Magento_Ui/js/model/messageList',
        'Magento_Checkout/js/model/totals'
    ],
    function($, Component, additionalValidators, quote, customerData, url, messageList, totals) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Esparksinc_IvyPayment/payment/ivy'
            },
            getMailingAddress: function() {
                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },
            getInstructions: function() {
                return window.checkoutConfig.payment.instructions[this.item.method];
            },
            getLogo: function() {
                return require.toUrl('Esparksinc_IvyPayment/images/ivylogo.svg');
            },

            banner: function() {
                console.log('banner');
                window.initIvy();
            },

            getTotal: function() {
                console.log('total');
                return totals.totals().base_grand_total;
            },

            getCurrency: function() {
                console.log('currency');
                return totals.totals().quote_currency_code;
            },

            getStoreLogo: function() {
                console.log('getStoreLogo');
                return window.checkoutConfig.logo;
            },

            getMcc: function() {
                return window.checkoutConfig.mcc;
            },

            getLocale: function() {
                return window.checkoutConfig.locale;
            },

            continueToIvy: function() {
                $('body').trigger('processStart');
                if (additionalValidators.validate()) {
                    customerData.invalidate(['cart']);
                    var linkUrl = url.build('ivypayment/checkout/index');
                    $.ajax({
                        url: linkUrl,
                        type: 'POST',
                        success: function(response) {
                            $('body').trigger('processStop');
                            $.mage.redirect(response.redirectUrl);
                        },
                        error: function(xhr, status, errorThrown) {
                            $('body').trigger('processStop');
                            messageList.addErrorMessage({ message: errorThrown });
                        }
                    });


                    return false;
                }
            }
        });
    }
);