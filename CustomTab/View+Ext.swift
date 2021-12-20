//
//  View+Ext.swift
//  CustomTab
//
//  Created by dophin on 2021/12/20.
//

import Foundation
import SwiftUI
extension View {
    func getTag<TagType: Hashable>() throws -> TagType {
            // Mirror this view
        let mirror = Mirror(reflecting: self)
        
            // Get tag modifier
        guard let realTag = mirror.descendant("modifier", "value") else {
                // Not found tag modifier here, this could be composite
                // view. Check for modifier directly on the `body` if
                // not a primitive view type.
            guard Body.self != Never.self else {
                throw TagError.notFound
            }
            return try body.getTag()
        }
        
            // Bind memory to extract tag's value
        let fakeTag = try withUnsafeBytes(of: realTag) { ptr -> FakeTag<TagType> in
            let binded = ptr.bindMemory(to: FakeTag<TagType>.self)
            guard let mapped = binded.first else {
                throw TagError.other
            }
            return mapped
        }
        
            // Return tag's value
        return fakeTag.value
    }
    
    func extractTag<TagType: Hashable>(_ closure: (() throws -> TagType) -> Void) -> Self {
        closure(getTag)
        return self
    }
}

enum TagError: Error, CustomStringConvertible {
    case notFound
    case other
    
    public var description: String {
        switch self {
            case .notFound: return "Not found"
            case .other: return "Other"
        }
    }
}

enum FakeTag<TagType: Hashable> {
    case tagged(TagType)
    
    var value: TagType {
        switch self {
            case let .tagged(value): return value
        }
    }
}
