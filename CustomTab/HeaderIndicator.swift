//
//  Headerindicator.swift
//
//  Created by dophin on 2021/12/16.
//

import SwiftUI

struct HeaderIndicator:View {
    
    
    @ObservedObject var h_model: HeaderIndicatorViewmodel
    
    var body:some View {
        VStack {
            Spacer().frame(height: 4)
            HStack {
                Spacer().frame(width: 4)
                
                ForEach (0..<h_model.items.count) { i in
                    if(i == (h_model.items.count - 1 ) ) {
                        H_indButton(model: h_model,
                                    button_name: h_model.items[i],
                                    id:i
                        )
                        
                    }else {
                        H_indButton(model: h_model,
                                    button_name: h_model.items[i],
                                    id:i
                        )
                        
                        H_divider()
                    }
                }
                Spacer().frame(width: 4)
            }//.frame(height: 24)
            Spacer().frame(height: 4)
        }
        
        .background(Color(hex:"2C2835"))
        .frame(height: 32)
        
        .cornerRadius(4)
    }
    
}
struct H_divider:View {
    var body:some View {
        HStack {
            Spacer().frame(width: 4)
            HStack{Color(hex: "4D958EA9")}.frame(width: 1)
            Spacer().frame(width: 4)
        }
        .frame(height: 24)
    }
}


struct H_indButton:View {
    @ObservedObject var model: HeaderIndicatorViewmodel
    var button_name:String = ""
    var id:Int
    
    var body:some View {
        ZStack {
            if(model.selectedIndex == id) {
                Color(hex:"6A6280")
            }
            else {
                Color(hex:"2C2835")
            }
            
            HStack {
                Spacer()
                Text(button_name).foregroundColor(.white)
                Spacer()
            }
        }        
        .onTapGesture {
            model.selectedAndHighlight(id)
        }
        .cornerRadius(4)
    }
}
struct Headerindicator_Previews: PreviewProvider {
    static var previews: some View {
        HeaderIndicator(h_model: HeaderIndicatorViewmodel(items:["page1","page2","page3"]) )
    }
}
