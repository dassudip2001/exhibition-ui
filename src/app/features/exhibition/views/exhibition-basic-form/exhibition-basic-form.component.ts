import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  ExhibitionStatusT,
  ExhibitionSectionTypeT,
  CreateExhibition,
} from '../../model/exhibition.mode';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exhibition-basic-form',
  imports: [
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    CommonModule,
    DragDropModule,
  ],
  templateUrl: './exhibition-basic-form.component.html',
  styles: `
  /* exhibition-form.component.scss */
:host {
  display: block;
  font-family: 'Roboto', Arial, sans-serif;
}

.exhibition-form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #444;
}

.form-section {
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;
    
    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
    }
    
    &.ng-invalid.ng-touched {
      border-color: #e74c3c;
    }
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23555' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  .form-group {
    flex: 1;
    margin-bottom: 0;
  }
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
  
  button {
    padding: 12px 20px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-weight: 500;
    color: #777;
    transition: all 0.2s;
    
    &.active, &:hover {
      color: #4a90e2;
    }
    
    &.active {
      border-bottom-color: #4a90e2;
    }
  }
}

.tab-content {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* File upload styling */
.file-upload {
  position: relative;
  
  input[type="file"] {
    padding: 8px;
    border: 2px dashed #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: #4a90e2;
      background-color: #f0f7ff;
    }
  }
  
  .file-preview {
    margin-top: 10px;
    
    img {
      max-width: 100%;
      max-height: 200px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
}

/* Slug field styling */
.slug-field {
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    flex: 1;
  }
  
  button {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
}

/* Sections styling */
.sections-container {
  margin-top: 20px;
}

.section-help {
  color: #777;
  font-style: italic;
  margin-bottom: 16px;
}

.sections-list {
  margin-bottom: 20px;
}

.section-item {
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &.cdk-drag-preview {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  &.cdk-drag-placeholder {
    opacity: 0.3;
  }
  
  .drag-handle {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    background-color: #f5f5f5;
    border-right: 1px solid #eaeaea;
    
    svg {
      width: 16px;
      height: 16px;
      color: #999;
    }
  }
}

.section-header {
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 12px 15px 12px 30px;
  border-bottom: 1px solid #eaeaea;
  
  .section-number {
    font-weight: bold;
    color: #777;
    margin-right: 10px;
    min-width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .section-title {
    flex: 1;
    font-weight: 500;
    color: #333;
  }
  
  .section-type-badge {
    padding: 3px 8px;
    background-color: #e8f0fe;
    color: #4a90e2;
    border-radius: 12px;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
  }
  
  .btn-delete {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
      color: #e74c3c;
      background-color: rgba(231, 76, 60, 0.1);
    }
  }
}

.section-content {
  padding: 16px 16px 16px 30px;
}

/* Form actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 20px 0;
  border-top: 1px solid #eee;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
  border: none;
  
  &:hover {
    background-color: #3a7bc8;
  }
  
  &:disabled {
    background-color: #a5c6ef;
    cursor: not-allowed;
  }
}

.btn-secondary {
  background-color: #f3f3f3;
  color: #555;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #e6e6e6;
  }
  
  &:disabled {
    color: #aaa;
    background-color: #f8f8f8;
    cursor: not-allowed;
  }
}

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #f0f7ff;
  color: #4a90e2;
  border: 1px dashed #a5c6ef;
  border-radius: 4px;
  padding: 14px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    transition: transform 0.2s;
  }
  
  &:hover {
    background-color: #e0f0ff;
    
    svg {
      transform: scale(1.2);
    }
  }
}

/* Preview tab styling */
.preview-container {
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.preview-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  
  h1 {
    margin: 0 0 10px 0;
    padding: 0;
    border: none;
  }
  
  .preview-dates {
    color: #777;
    margin-bottom: 10px;
  }
  
  .preview-status {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    
    &.draft {
      background-color: #fff8e1;
      color: #ff9800;
    }
    
    &.published {
      background-color: #e8f5e9;
      color: #4caf50;
    }
    
    &.archived {
      background-color: #efebe9;
      color: #795548;
    }
  }
}

.preview-banner {
  width: 100%;
  height: 300px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.preview-description {
  padding: 20px;
  border-bottom: 1px solid #eee;
  line-height: 1.6;
  color: #555;
}

.preview-sections {
  padding: 20px;
  
  .preview-section {
    margin-bottom: 30px;
    
    h3 {
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      color: #333;
    }
    
    .preview-section-content {
      line-height: 1.6;
      color: #555;
    }
  }
}

.preview-text, .preview-html, .preview-default {
  white-space: pre-line;
}

.preview-image, .preview-gallery, .preview-slider, .preview-carousel, 
.preview-video, .preview-embedded, .preview-iframe {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  
  img {
    max-width: 100%;
    max-height: 400px;
  }
}

.gallery-placeholder, .slider-placeholder, .carousel-placeholder,
.video-placeholder, .embedded-placeholder, .iframe-placeholder {
  color: #777;
  padding: 40px;
  border: 2px dashed #ddd;
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .tab-navigation {
    flex-wrap: wrap;
    
    button {
      flex: 1;
      padding: 10px;
      text-align: center;
    }
  }
  
  .preview-banner {
    height: 200px;
  }
}

/* CDK Drag Drop Animation */
.cdk-drop-list-dragging .section-item:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}`,
})
export class ExhibitionBasicFormComponent implements OnInit {
  exhibitionForm!: FormGroup;
  statusOptions = Object.values(ExhibitionStatusT);
  sectionTypeOptions = Object.values(ExhibitionSectionTypeT);

  previewImage: string | null = null;
  previewThumbnail: string | null = null;

  // For preview purposes
  activeTab = 'basic';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.exhibitionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      bannerImage: ['', [Validators.required]],
      thumbnailImage: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: [ExhibitionStatusT.DRAFT, [Validators.required]],
      slug: [
        '',
        [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)],
      ],
      sections: this.fb.array([]),
    });

    // Add a default section
    this.addSection();
  }

  // Getters for form access
  get sections(): FormArray {
    return this.exhibitionForm.get('sections') as FormArray;
  }

  // Create a new section
  addSection(): void {
    const sectionGroup = this.fb.group({
      id: [uuidv4()],
      type: [ExhibitionSectionTypeT.TEXT, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      order: [this.sections.length],
    });

    this.sections.push(sectionGroup);
  }

  // Remove a section
  removeSection(index: number): void {
    this.sections.removeAt(index);

    // Update order values
    this.updateSectionOrder();
  }

  // Handle drag and drop
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.sections.controls,
      event.previousIndex,
      event.currentIndex
    );

    // Update order values
    this.updateSectionOrder();
  }

  // Generate slug from title
  generateSlug(): void {
    const title = this.exhibitionForm.get('title')?.value;
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      this.exhibitionForm.get('slug')?.setValue(slug);
    }
  }

  // Helper to get section form group (with proper typing)
  getSectionFormGroup(index: number): FormGroup {
    return this.sections.at(index) as FormGroup;
  }

  // Handle file uploads for banner image
  onBannerImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.exhibitionForm.get('bannerImage')?.setValue(file.name);
      };

      reader.readAsDataURL(file);
    }
  }

  // Handle file uploads for thumbnail image
  onThumbnailImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewThumbnail = reader.result as string;
        this.exhibitionForm.get('thumbnailImage')?.setValue(file.name);
      };

      reader.readAsDataURL(file);
    }
  }

  // Get the appropriate content field type based on section type
  getSectionContentFieldType(type: ExhibitionSectionTypeT): string {
    switch (type) {
      case ExhibitionSectionTypeT.TEXT:
        return 'textarea';
      case ExhibitionSectionTypeT.HTML:
        return 'textarea';
      case ExhibitionSectionTypeT.IMAGE:
      case ExhibitionSectionTypeT.GALLERY:
      case ExhibitionSectionTypeT.SLIDER:
      case ExhibitionSectionTypeT.CAROUSEL:
        return 'file';
      case ExhibitionSectionTypeT.VIDEO:
      case ExhibitionSectionTypeT.EMBEDDED:
      case ExhibitionSectionTypeT.IFRAME:
        return 'url';
      default:
        return 'text';
    }
  }

  // Submit form
  onSubmit(): void {
    if (this.exhibitionForm.valid) {
      const formData = this.exhibitionForm.value as CreateExhibition;
      console.log('Form submitted:', formData);
      // Here you would call your service to save the exhibition
    } else {
      this.markFormGroupTouched(this.exhibitionForm);
    }
  }
  // Helper method to change active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Helper to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Update order values after reordering
  private updateSectionOrder(): void {
    this.sections.controls.forEach((control, index) => {
      control.get('order')?.setValue(index);
    });
  }
}
