import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";
import { AddProductComponent } from "./add-product/add-product.component";

const routes : Routes =[
    {path: '', component: ProductListComponent},
    {path: 'cart/:id', component: CartComponent},
    {path: 'add', component: AddProductComponent},
] 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductsRoutingModule { }