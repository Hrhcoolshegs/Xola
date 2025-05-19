// Update the file upload section in Clinical.tsx
// Replace the existing upload section with:

{step === 1 && (
  <div className="flex flex-col items-center">
    <ImageUploader
      onImagesChange={setUploadedFiles}
      initialImages={uploadedFiles}
    />
    
    <div className="w-full max-w-2xl">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Historical Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {clinicalData.diagnostics[0].images.map((image, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <img 
              src={image.url} 
              alt={`Historical ${image.type}`} 
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <p className="text-xs text-gray-500">{image.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="flex justify-end w-full max-w-2xl mt-6">
      <Button 
        variant="primary" 
        disabled={uploadedFiles.length === 0 || uploadProgress < 100}
        onClick={nextStep}
        icon={<ChevronRight size={16} />}
        iconPosition="right"
      >
        {t('common.next')}
      </Button>
    </div>
  </div>
)}