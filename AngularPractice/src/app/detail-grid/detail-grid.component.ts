import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import * as AspNetData from "devextreme-aspnet-data-nojquery";


@Component({
    selector: 'detail-grid',
    templateUrl: './detail-gird.component.html',
    styleUrls: ['./detail-grid.component.css'],
    providers: []
})
export class DetailGridComponent implements AfterViewInit {

    @Input() key: number;
    dataSource: DataSource

    ngAfterViewInit() {
        this.dataSource = new DataSource({
            store: AspNetData.createStore({
                loadUrl: "https://raw.githubusercontent.com/hsh-code/FileStorage/main/EmployeeTest",
                loadParams: { orderID: this.key },
                onBeforeSend: function (method, ajaxOptions) {
                    ajaxOptions.xhrFields = { withCredentials: true };
                }
            })
        })
    }
}

