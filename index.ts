import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
//import '@polymer/iron-ajax/iron-ajax.js';
//<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSample_Disease_List_chart" handle-as="json" last-response="{{diseaseresultdata}}"></iron-ajax>

class IdSearch extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">
</style>
<div class="globalNavSearch">
  <form on-submit="handleSubmit">
    <input type="text" placeholder="Accession Number" name="aNum" on-submit="handleSubmit" id="aNum"/>
  </form>
</div>
selection: {{selection}}
`;
  }
  static get properties() {
    return {
      selection: {
        notify: true,
        type: String,
        value: function () {
          return new String();
        }
      }
    };
  }

  ready() {
    super.ready();
    console.log("ready");
  }
  handleClick(e) {
    console.log('click');
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    console.log(this.shadowRoot.getElementById("aNum").value);

    fetch("https://test.sparqlist.glyconavi.org/api/WURCS2GlyTouCan?WURCS=WURCS%3D2.0%2F2%2C2%2C1%2F%5Ba2122h-1b_1-5_2*NCC%2F3%3DO%5D%5Ba2112h-1b_1-5%5D%2F1-2%2Fa4-b1").then(response => {
      if (response.ok) {
        console.log("ok");
        // console.log(response.json());
        // console.log(JSON.stringify(response));

        // Examine the text in the response
        response.json().then(function (data) {
          console.log("data:>");
          console.log(data);
          console.log(data[0]);
          console.log(data[0].GlyTouCan);
        });
        return;
      }
      throw new Error('Network response was not ok.');
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });

    // this.selection=
  }
  _handleAjaxPostError(e) {
    console.log('error: ' + e);
  }
}

customElements.define('gtc-wc-id-search', IdSearch);
