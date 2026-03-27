package com.retail.app.dto;

import jakarta.validation.constraints.NotBlank;

public class PlaceOrderRequest {

    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // For now only COD is expected

    public PlaceOrderRequest() {
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
