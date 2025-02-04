import { Component, OnInit } from "@angular/core";
import { Product } from "@app/core/_models/product";
import { AccountService } from "@app/core/_services/account.service";
import { ProductHelperService } from "@app/core/_services/product.helper.service";
import { ProductService } from "@app/core/_services/products.service";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl: 'product-list.component.html',
    selector: 'app-product-list'
})

export class ProductListComponent implements OnInit {
    products!: Product[];
    cartCount!: number | null;
    user:any;
    isAdmuin:boolean = false;

    constructor(private productService: ProductService,
        private accountService: AccountService,
        private toastr: ToastrService,
        private productHelper: ProductHelperService) {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.isAdmuin = this.user && this.user?.role == 'Admin' ? true : false;
    }

    ngOnInit(): void {
        this.productHelper.setCartCount(null);
        this.productHelper.getCartCount().subscribe({
            error: (error) => {
                console.log(error)
            }
        })
        this.productService.getAllProducts().subscribe({
            next: (result) => {
                this.products = result.dataList;
            },
            error: (error) => {
                this.toastr.error(error.message);
            }
        })
    }

    deleteProduct(id: number){
        this.products = this.products.filter(p => {
            return p.productId != id
        })
    }
};