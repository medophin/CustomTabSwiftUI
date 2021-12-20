    //
    //  CustomTabView.swift

    //
    //  Created by dophin on 2021/12/17.
    //
    //https://stackoverflow.com/questions/59608417/swiftui-casting-tupleview-to-an-array-of-anyview
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
        
        TabView(selection: $h_model.selectedIndex) {
            ForEach( views.indices) { index in
                views[index]
                    .tag(index)
                    .frame(maxWidth: .infinity)
                   
            }
        }.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
           

    }
}


struct CustomDemoPreviewPage: View {
    @StateObject var h_model :HeaderIndicatorViewmodel = HeaderIndicatorViewmodel(items:["page 0","page 1","page 2","page 3"])
    
    var body: some View {
        VStack {
            HeaderIndicator(h_model: h_model)                        
            CustomTabView(h_model) {
                Text("1")
                Text("2")
                Text("3")
                Text("4")
            }
        }
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
