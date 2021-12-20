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
    @Published var offset: CGFloat = 0
    var lastOnAppearInd:Int? = nil
    var lastOnDisAppearInd:Int? = nil
    var items: [String]
    
    init(items: [String]) {
        self.items = items
    }
      
    func selectedAndHighlight(_ index: Int) {
        selectedIndex = index
    }
    
}
