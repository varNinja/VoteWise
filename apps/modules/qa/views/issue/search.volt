
{{ content() }}

<table width="100%">
    <tr>
        <td align="left">
            {{ link_to("issu/index", "Go Back") }}
        </td>
        <td align="right">
            {{ link_to("issu/new", "Create ") }}
        </td>
    </tr>
</table>

<table class="browse" align="center">
    <thead>
        <tr>
            <th>Issuid</th>
            <th>Desc</th>
            <th>Order</th>
            <th>Crdt</th>
            <th>Crdtid</th>
            <th>Updt</th>
            <th>Updtid</th>
            <th>Delmark</th>
         </tr>
    </thead>
    <tbody>
    {% if page.items is defined %}
    {% for issu in page.items %}
        <tr>
            <td>{{ issu.getIssuid() }}</td>
            <td>{{ issu.getDesc() }}</td>
            <td>{{ issu.getOrder() }}</td>
            <td>{{ issu.getCrdt() }}</td>
            <td>{{ issu.getCrdtid() }}</td>
            <td>{{ issu.getUpdt() }}</td>
            <td>{{ issu.getUpdtid() }}</td>
            <td>{{ issu.getDelmark() }}</td>
            <td>{{ link_to("issu/edit/"~issu.getIssuid(), "Edit") }}</td>
            <td>{{ link_to("issu/delete/"~issu.getIssuid(), "Delete") }}</td>
        </tr>
    {% endfor %}
    {% endif %}
    </tbody>
    <tbody>
        <tr>
            <td colspan="2" align="right">
                <table align="center">
                    <tr>
                        <td>{{ link_to("issu/search", "First") }}</td>
                        <td>{{ link_to("issu/search?page="~page.before, "Previous") }}</td>
                        <td>{{ link_to("issu/search?page="~page.next, "Next") }}</td>
                        <td>{{ link_to("issu/search?page="~page.last, "Last") }}</td>
                        <td>{{ page.current~"/"~page.total_pages }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    <tbody>
</table>
