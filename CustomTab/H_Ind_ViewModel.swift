//
//  HeaderIndicatorViewModel.swift
//
//  Created by dophin on 2021/12/16.
//

import Foundation
import UIKit
final class HeaderIndicatorViewmodel : ObservableObject {
        // for change tab
    @Published var selectedIndex:Int = 0
    @Published var highlightIndex:Int = 0
    @Published var offset: CGFloat = 0
    @Published var insdeGeoOffset: CGFloat = 0
    var lastOnAppearInd:Int? = nil
    var lastOnDisAppearInd:Int? = nil
    
    
    func changeTab(onAppearInd:Int? = nil , onDisAppearInd:Int? = nil) {
        
        if let oai = onAppearInd {
            lastOnAppearInd = oai
        }
        if onDisAppearInd != nil {
            lastOnDisAppearInd = onDisAppearInd
        }
        
        
        print("\(String(describing: lastOnAppearInd))")
        print("\(String(describing: lastOnDisAppearInd))")
        print("\(highlightIndex)")
        
        switch highlightIndex {
            case 0:
                if(lastOnAppearInd == 1) && (onDisAppearInd == 0){
                    highlightIndex = 1
                    print("highlightIndex = \(highlightIndex)")
                }
            case 1:
                if(lastOnAppearInd == 2) && (onDisAppearInd == 1){
                    highlightIndex = 2
                }else if(lastOnAppearInd == 0) && (onDisAppearInd == 1){
                    highlightIndex = 0
                }
                print("highlightIndex = \(highlightIndex)")
                
            case 2:
                if(lastOnAppearInd == 1) && (onDisAppearInd == 2){
                    highlightIndex = 1
                }
                print("highlightIndex = \(highlightIndex)")
            default:
                break
        }
    }
    
    func selectedAndHighlight(_ index: Int) {
        selectedIndex = index
        highlightIndex = index
    }
    
    func onAppear(index: Int) {
        changeTab(onAppearInd: index)
    }
    func onDisappear(index: Int) {
        changeTab(onDisAppearInd: index)
    }

}
