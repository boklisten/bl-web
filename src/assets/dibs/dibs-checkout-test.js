window.__CHECKOUT_DFP_URL=window.__CHECKOUT_DFP_URL||"",window.__CHECKOUT_ENDPOINT_DOMAIN=window.__CHECKOUT_ENDPOINT_DOMAIN||"",window.__CHECKOUT_CONSOLELOGS_ENABLED=window.__CHECKOUT_CONSOLELOGS_ENABLED||!1;var CheckoutOptions=function(){function e(e,t,n,i,o){this.checkoutKey=e,this.partnerMerchantNumber=t,this.paymentId=n,this.containerId=i,this.language=o}return e}(),Dibs;!function(e){var t;!function(e){e[e.unknown=0]="unknown",e[e.resize=1]="resize",e[e.goto3DS=2]="goto3DS",e[e.paymentOrderFinalized=3]="paymentOrderFinalized",e[e.payInitialized=4]="payInitialized",e[e.paymentSuccess=5]="paymentSuccess",e[e.dfpFetchSessionId=6]="dfpFetchSessionId",e[e.dfpRemoveComponent=7]="dfpRemoveComponent"}(t||(t={}));var n=function(){function e(e,t){this.eventType=e,this.data=t}return e.prototype.toJson=function(){return JSON.stringify(this)},e}(),i=function(){function e(e){this.options=e,this.iFrameDefaultContainerId="dibs-checkout-content",this.iFrameContentStyleClass="dibs-checkout-wrapper",this.iFrameId="dibs-checkout-iframe",this.dfpScriptId="dfpTag",this.is3DS=!1,this.init()}return e.prototype.on=function(e,t){"pay-initialized"===e?this.onPayInitializedEvent=t:"payment-completed"===e&&(this.onPaymentCompletedEvent=t)},e.prototype.send=function(e,t){if("payment-order-finalized"===e){var n=t||!1;this.sendPaymentOrderFinalizedEvent(n)}},e.prototype.init=function(){this.options.containerId||(this.options.containerId=this.iFrameDefaultContainerId),this.is3DS=this.getQueryStringParameter("paymentId",window.location.href).length>0,this.endPointDomain=window.__CHECKOUT_ENDPOINT_DOMAIN,this.iFrameSrc=this.endPointDomain+"/v1/?checkoutKey="+this.options.checkoutKey+"&paymentId="+this.options.paymentId,this.is3DS&&(this.iFrameSrc+="&skipdfp=true"),this.options.partnerMerchantNumber&&(this.iFrameSrc+="&partnerMerchantNumber="+this.options.partnerMerchantNumber),this.options.language&&(this.iFrameSrc+="&language="+this.options.language),this.styleSheetSrc=this.endPointDomain+"/v1/assets/css/checkout.css",this.load(),this.setListeners()},e.prototype.load=function(){var e=document.getElementsByTagName("head")[0];this.is3DS||this.addDfpScript(e),this.addStyleSheet(e),this.addMainIFrame()},e.prototype.addDfpScript=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=window.__CHECKOUT_DFP_URL,t.id=this.dfpScriptId,e.appendChild(t),this.consoleLog("Added dfp script "+t.src)},e.prototype.removeDfpScript=function(){var e=document.getElementById(this.dfpScriptId);null!==e&&null!==e.parentElement&&(e.parentElement.removeChild(e),this.consoleLog("Removed dfp script "+this.dfpScriptId))},e.prototype.addStyleSheet=function(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=this.styleSheetSrc,e.appendChild(t),this.consoleLog("Added stylesheet script "+t.href)},e.prototype.addMainIFrame=function(){this.iFrame=document.createElement("iframe"),this.iFrame.src=this.iFrameSrc,this.iFrame.id=this.iFrameId,this.iFrame.allowTransparency="true",this.iFrame.frameBorder="0",this.iFrame.scrolling="no";var e=document.getElementById(this.options.containerId);null!==e&&(e.setAttribute("class",this.iFrameContentStyleClass),e.appendChild(this.iFrame),this.consoleLog("Added main IFrame script to "+this.options.containerId))},e.prototype.fetchDfpSessionId=function(){if(!this.is3DS&&"undefined"!=typeof TrustevV2){var e=new n(t.dfpFetchSessionId,TrustevV2.SessionId);this.iFrame.contentWindow.postMessage(e.toJson(),this.endPointDomain)}},e.prototype.goto3DS=function(e){var t=e,n=document.createElement("div");n.style.display="none",n.innerHTML=t.form,document.body.appendChild(n);var i=document.getElementById(t.formId);null!==i&&i.submit()},e.prototype.resizeIFrame=function(e){var t=e,n=t+"px";this.iFrame.height=n},e.prototype.sendPaymentOrderFinalizedEvent=function(e){var i=new n(t.paymentOrderFinalized,e);this.iFrame.contentWindow.postMessage(i.toJson(),this.endPointDomain)},e.prototype.setListeners=function(){var e=this;window.addEventListener("message",function(n){if(e.checkMsgSafe(n)){var i=JSON.parse(n.data);switch(i.eventType){case t.dfpFetchSessionId:e.fetchDfpSessionId();break;case t.dfpRemoveComponent:e.removeDfpScript();break;case t.goto3DS:e.goto3DS(i.data);break;case t.payInitialized:e.onPayInitializedEvent?e.onPayInitializedEvent(i.data):(e.consoleLog("PaymentInitialized not handled by merchant"),e.sendPaymentOrderFinalizedEvent(!0));break;case t.paymentSuccess:e.onPaymentCompletedEvent(i.data);break;case t.resize:e.resizeIFrame(i.data);break;default:e.consoleLog("unknown event "+JSON.stringify(n)+" "+JSON.stringify(n.data))}}},!1),window.addEventListener("resize",function(i){if(e.checkMsgSafe(i)){var o=new n(t.resize,i);e.iFrame.contentWindow.postMessage(o.toJson(),e.endPointDomain)}})},e.prototype.checkMsgSafe=function(e){var t=e.origin;return void 0===t?(this.consoleLog("Checkout: unknown origin "+JSON.stringify(t)+" ("+JSON.stringify(e)+", "+JSON.stringify(e.data)+")"),!1):t===this.endPointDomain||(this.consoleLog("Checkout: unknown origin "+JSON.stringify(t)+" ("+JSON.stringify(e)+", "+JSON.stringify(e.data)+")"),!1)},e.prototype.getQueryStringParameter=function(e,t){if(e=e||"",t=t||"",0===e.length||0===t.length)return"";var n=new RegExp("[?&]"+e+"=([^&#]*)","i"),i=n.exec(t);return i?i[1]:""},e.prototype.consoleLog=function(e){window.__CHECKOUT_CONSOLELOGS_ENABLED&&console.log(e)},e}();e.Checkout=i}(Dibs||(Dibs={})),function(e){e.__CHECKOUT_DFP_URL="https://app-eu.trustev.com/api/v2.0/TrustevJS?key=79a9add39e9e49fa979a6d4b3b623f8b",e.__CHECKOUT_CONSOLELOGS_ENABLED=!1,e.__CHECKOUT_ENDPOINT_DOMAIN="https://test.checkout.dibspayment.eu"}(this);
