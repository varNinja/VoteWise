
{{ content() }}

<div align="right">
    {{ link_to("topc/new", "Create topc") }}
</div>

{{ form("topc/search", "method":"post", "autocomplete" : "off") }}

<div align="center">
    <h1>Search topc</h1>
</div>

<table>
    <tr>
        <td align="right">
            <label for="topcid">Topcid</label>
        </td>
        <td align="left">
                {{ text_field("topcid") }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="desc">Desc</label>
        </td>
        <td align="left">
            {{ text_field("desc", "size" : 30) }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="stop">Stop</label>
        </td>
        <td align="left">
                {{ text_field("stop") }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="order">Order</label>
        </td>
        <td align="left">
                {{ text_field("order") }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="crdt">Crdt</label>
        </td>
        <td align="left">
            {{ text_field("crdt", "size" : 30) }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="crdtid">Crdtid</label>
        </td>
        <td align="left">
                {{ text_field("crdtid") }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="updt">Updt</label>
        </td>
        <td align="left">
            {{ text_field("updt", "size" : 30) }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="updtid">Updtid</label>
        </td>
        <td align="left">
                {{ text_field("updtid") }}
        </td>
    </tr>
    <tr>
        <td align="right">
            <label for="delmark">Delmark</label>
        </td>
        <td align="left">
            {{ text_field("delmark", "size" : 30) }}
        </td>
    </tr>

    <tr>
        <td></td>
        <td>{{ submit_button("Search") }}</td>
    </tr>
</table>

</form>
