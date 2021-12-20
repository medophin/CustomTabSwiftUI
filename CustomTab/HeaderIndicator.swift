//
//  Headerindicator.swift
//
//  Created by dophin on 2021/12/16.
//

import SwiftUI

struct HeaderIndicator:View {
    var items: [String]
    
    @ObservedObject var h_model: HeaderIndicatorViewmodel
    
    var body:some View {
        VStack {
            Spacer().frame(height: 4)
            HStack {
                Spacer().frame(width: 4)
                
                ForEach (0..<items.count) { i in
                    if(i == (items.count - 1 ) ) {
                        H_indButton(model: h_model,
                                    button_name: items[i],
                                    id:i
                        )
                        
                    }else {
                        H_indButton(model: h_model,
                                    button_name: items[i],
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
            if(model.highlightIndex == id) {
                Color(hex:"6A6280").offset(x: -model.insdeGeoOffset, y: 0)
            }
            else if (model.insdeGeoOffset > 0) && (model.highlightIndex == id + 1){
                Color(hex:"6A6280")
                Color(hex:"2C2835").offset(x: -model.insdeGeoOffset, y: 0)
            }
            else if (model.insdeGeoOffset < 0) && (model.highlightIndex == id - 1){
                Color(hex:"6A6280")
                Color(hex:"2C2835").offset(x: -model.insdeGeoOffset, y: 0)
            }
            
            HStack {
                Spacer()
                Text(button_name).foregroundColor(.white)
//                Text("\(model.highlightIndex)").foregroundColor(.white)
//                Text("\(id)").foregroundColor(.white)
                
                Spacer()
            }
           
            
        }
//        .background(() ?
//
//        )
        
        .onTapGesture {
            model.selectedAndHighlight(id)
        }
        .cornerRadius(4)
    }
}
struct Headerindicator_Previews: PreviewProvider {
    static var previews: some View {
        HeaderIndicator( items:  ["page1","page2","page3"],h_model: HeaderIndicatorViewmodel() )
    }
}