import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { CoreModule } from "../core/core.module";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
    declarations: [ProductListComponent,
        CartComponent,
        ProductComponent,
        AddProductComponent],

    imports: [CommonModule, ProductsRoutingModule, CoreModule,
    ]
})

export class ProductsModule { };