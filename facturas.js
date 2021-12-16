$(document).ready(function (){

    //función para completar el campo precio total antes de aplicar el descuento

    //
    $("#precio-unitario").keyup(function (Event){

        let precioTotal = ($('#cantidad').val() * $('#precio-unitario').val());

        precioTotal = precioTotal.toFixed(2);
            
        $('#total-linea').val(precioTotal);
            
           Event.preventDefault();
           $('#descuento').val();

        if($('#descuento').val() >= 0){

            $("#descuento").mouseleave(function (Event){

                let precioTotal = ($('#cantidad').val() * $('#precio-unitario').val()) - ($('#cantidad').val() * $('#precio-unitario').val()) * (($('#descuento').val()) / 100);
                
                precioTotal = precioTotal.toFixed(2);

                $('#total-linea').val(precioTotal);
                
                Event.preventDefault();
            });
            
        };

        if($('#descuento').val() == ''){

            let precioTotal = ($('#cantidad').val() * $('#precio-unitario').val());

            precioTotal = precioTotal.toFixed(2);
           
            $('#total-linea').val(precioTotal);
            
        };
    });

    
    


    //función agregar una fila a la tabla al pulsar botón agregar
    $("#agregarLinea").click (function (Event){

        let boton = '<a href="" id="borrar" class="btn btn-success">Borrar</a>';
        
        
        $("tbody").append("<tr><td>" + $("#producto").val() + "</td><td>" + $('#cantidad').val() + "</td><td>" + $('#precio-unitario').val() + "</td><td>" + $('#descuento').val() + "</td><td>" + $('#total-linea').val() + "</td><td>" + boton + "</td></tr>");

       
        //agrega la id que se utilizará para modificar todos los descuentos
        $("tbody > tr:last-of-type > td:nth-last-child(3)").attr("id","des-total");

        $("tbody > tr:last-of-type > td:nth-last-child(2)").attr("id","recal");

        $("tbody > tr:last-of-type > td:nth-last-child(4)").attr("id","recal-precio");

        $("tbody > tr:last-of-type > td:nth-last-child(5)").attr("id","recal-cantidad");

        $("tbody > tr:last-of-type").attr("id","global");

        //fución al pulsar botón, borra la fila en la que se encuentra dicho botón
        $(document).on('click', '#borrar', function (event) {
            event.preventDefault();
            $(this).closest('tr').remove();


            //si se pulsa el botón borrar se recalcula el total
            var sum = 0;

            $("tbody > tr > td:nth-last-child(2)").each(function() {
                sum += Number($(this).text());
            });
                sum = sum.toFixed(2);
            $("#base-imponible").text(sum);
            
            //Recalcular IVA
            var porcen = 0;

            $("tbody > tr > td:nth-last-child(2)").each(function() {
                porcen += Number($(this).text());

                iva = porcen * 0.21;
            });
            iva = iva.toFixed(2);
            $("#iva").text(iva);

            //Recalcular TOTAL

            sum = parseFloat(sum);
            iva = parseFloat(iva);
           
            let total = sum + iva;

            total = total.toFixed(2);
           
            $("#total").text(total);
            
        });

        Event.preventDefault();

    });
    

    //función limpiar todos los input después de agregar la fila
    $("#agregarLinea").click(function(){
        $('input[type="text"]').val('');
        $('input[type="number"]').val('')
    });

    $("#agregarLinea").click(function(Event){
        
        //cálculo total base imponible
        var sum = 0;

        $("tbody > tr > td:nth-last-child(2)").each(function() {
            sum += Number($(this).text());

        });
        sum = sum.toFixed(2);
        $("#base-imponible").text(sum);

        Event.preventDefault();

        //cálculo total iva
        var porcen = 0;

        $("tbody > tr > td:nth-last-child(2)").each(function() {
            porcen += Number($(this).text());

            iva = (porcen * 0.21);
        });
        iva = iva.toFixed(2);
         $("#iva").text(iva);

         //cálculo total
        
         sum = parseFloat(sum);
         iva = parseFloat(iva);

         let total = sum + iva;

         total = total.toFixed(2);
        
         $("#total").text(total);

    });
    
   
    //añade lahora de cualquier modificación en la web
    $(document).click(function() {
        (function() {
            let fecha = new Date()
            .toLocaleDateString("es-ES", {
              hour: 'numeric',
              minute: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            $("tfoot > tr:nth-last-child(1) > td:nth-last-child(1)").text("modificado el "  + fecha);
        }());
      
    });

    //aplicar descuento a todas las filas al mismo tiempo
     
    $("#aplicarDescuento").click(function(Event){

        
        $("tbody > tr").each(function() {
            
            $("tbody > tr > td#des-total").text($("#descuento-lineas").val());

            let recantidad = $('#recal-cantidad').text();

            recantidad = parseFloat(recantidad);

           let reprecio = $('#recal-precio').text();

           reprecio = parseFloat(reprecio);

           let retotal = $('#des-total').text();

           retotal = parseFloat(retotal);

            let recal = (recantidad * reprecio) - (recantidad * reprecio) * (retotal / 100);

            $('#recal').text(recal);
            
        });

        

        Event.preventDefault();

        


    });  

    
});
