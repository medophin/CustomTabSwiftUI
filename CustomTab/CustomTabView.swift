//
//  CustomTabView.swift

//
//  Created by dophin on 2021/12/17.
//

import SwiftUI
import ViewExtractor
struct CustomTabView: View {
    private var views: [AnyView]
    @ObservedObject var h_model: HeaderIndicatorViewmodel
    
    // For 2 or more views
    init<Views>(_ hmodel: HeaderIndicatorViewmodel ,  @ViewBuilder  content: TupleContent<Views>) {
        views = ViewExtractor.getViews(from: content)
        self.h_model = hmodel
    }
    
    // For 0 or 1 view
    init<Content: View>( _ hmodel: HeaderIndicatorViewmodel ,  @ViewBuilder  content: NormalContent<Content>) {
        views = ViewExtractor.getViews(from: content)
        self.h_model = hmodel
    }
    
    
    var body: some View {
        GeometryReader { outsideProxy in
            TabView(selection: $h_model.selectedIndex) {
                ForEach( (0..<views.count)) { index in
                    //                GeometryReader { insideProxy in
                    views[index].tag(index)
                        .frame(maxWidth: .infinity)
                        .overlay(
                            GeometryReader { insideProxy -> AnyView in
                                
                                AnyView (Color.clear                    .preference(key: ScrollOffsetPreferenceKey.self, value: [ outsideProxy.frame(in: .global).width,
                                                                                                                                  insideProxy.frame(in: .global).minX,
                                                                                                                                ]))
                                
                            }
                        )
                    
                        .onAppear {
                            h_model.onAppear(index: index)
                        }
                        .onDisappear {
                            h_model.onDisappear(index: index)
                        }
                    
                    
                    //                }.ignoresSafeArea()
                    
                }
            }.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
        }.onPreferenceChange(ScrollOffsetPreferenceKey.self) { value in
            h_model.offset = value[0]
            h_model.insdeGeoOffset = value[1]
        }
    }
}


struct CustomDemoPreviewPage: View {
    @StateObject var h_model = HeaderIndicatorViewmodel()
    
    var body: some View {
        VStack {
            HeaderIndicator(items: ["page1","page2","page3"], h_model: h_model)

            
            CustomTabView(h_model) {
                Text("1")
                Text("2")
                Text("3")
            }
            
            
            
            
          

        }
    }
 
}

struct ScrollOffsetPreferenceKey: PreferenceKey {
    typealias Value = [CGFloat]
    
    static var defaultValue: [CGFloat] = [0,0]
    
    static func reduce(value: inout [CGFloat], nextValue: () -> [CGFloat]) {
        value.append(contentsOf: nextValue())
    }
}

struct CustomTabView_Previews: PreviewProvider {
    
    static var previews: some View {
        CustomDemoPreviewPage()
    }
}

//
//struct Page1: View{
//
//    var body:some View {
//
//
//    }
//}
