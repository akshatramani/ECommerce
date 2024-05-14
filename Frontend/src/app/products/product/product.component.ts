import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "@app/core/_models/product";
import { AccountService } from "@app/core/_services/account.service";
import { ProductHelperService } from "@app/core/_services/product.helper.service";
import { ProductService } from "@app/core/_services/products.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html'
})

export class ProductComponent {
    @Input() productData!: Product;
    @Output() delete = new EventEmitter();
    user:any;
    isAdmuin:boolean = false;

    constructor(private productService: ProductService,
        private accountService: AccountService,
        private toastrService: ToastrService,
        private productHelper: ProductHelperService,
        private toastr : ToastrService) {
            this.user = JSON.parse(localStorage.getItem('user') || '{}');
            this.isAdmuin = this.user && this.user?.role == 'Admin' ? true : false;
    }

    addToCart(productId: number) {
        const userId = this.accountService.userValue?.id || 0;
        this.productService.addToCart(productId, userId).subscribe({
            next: (result) => {
                this.productHelper.setCartCount(null);
                this.productHelper.getCartCount().subscribe({
                    next: (result) => {
                    },
                    error: (error) => {
                        console.log(error);
                    }
                })
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    deleteProduct(productId: number){
        if(confirm("Are you sure, you want to delete product?")){
            this.productService.deleteProduct(productId).subscribe({
                next: (result) => {
                    console.log(result);
                    this.delete.emit(productId);
                    this.toastr.success('Product deleted successfuly.');
                },
                error: (error) => {
                    console.log(error);
                }
            })
        }
    }

    shortenDescription(text: string) {
        if (text && text.length > 100) {
            text = text.substring(0, 100) + "..."
        }
        return text;
    }
};