import { Component } from '@angular/core';
import { ProductService } from '@app/core/_services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product:any = {};
  constructor(
    private productService: ProductService,
    private toastr : ToastrService

  ){
    
  }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        if(response && response.statusCode == 5001){
          this.toastr.error(response.message);
        }else{
          this.product = {}
          this.toastr.success('Product added successfuly.');
        }

        // Handle successful response here
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error adding product:', error);
        // Handle error response here
      }
    );
  }
}
