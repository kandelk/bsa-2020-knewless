package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/author")
public class AuthorController {
	
	private final AuthorService authorService;
	
	@Autowired
	public AuthorController(AuthorService authorService) {
		this.authorService = authorService;
	}
	
	@GetMapping
	public Optional<AuthorSettingsDto> getSettings(@CurrentUser UserPrincipal userPrincipal) {
		return authorService.getAuthorSettings(userPrincipal.getId());
	}
	
	@PostMapping
	public ResponseEntity<?> setSettings(@CurrentUser UserPrincipal userPrincipal,
										 @Valid @RequestBody AuthorSettingsDto settings,
										 Errors validationResult) {
		if (validationResult.hasErrors()) {
			return ResponseEntity.badRequest()
					.body(new SingleMessageResponse(
									ValidationMessageCreator.createString(validationResult, " ")
							)
					);
		}
		final var currentUserId = userPrincipal.getId();
		if (currentUserId == null) {
			return ResponseEntity.badRequest().body(new SingleMessageResponse("User id cannot be null."));
		}
		settings.setUserId(currentUserId);
		final var savingResult = authorService.setAuthorSettings(settings);
		if (savingResult.isPresent()) {
			return ResponseEntity.ok(new SingleMessageResponse("Success. Your profile has been updated."));
		}
		return new ResponseEntity<>(
				new SingleMessageResponse("An error occurred while saving changes."), HttpStatus.INTERNAL_SERVER_ERROR
		);
	}
	
	@GetMapping("/self-info")
	public AuthorBriefInfoDto getAuthorInfo(@CurrentUser UserPrincipal userPrincipal,
											@RequestParam(required = false, name = "userId") String userId) {
		return authorService.getAuthorInfoByUserId(userId == null ? userPrincipal.getId() : UUID.fromString(userId));
	}
	
	@GetMapping("/overview/{authorId}")
	public ResponseEntity<?> getPublicAuthor(@PathVariable UUID authorId, @CurrentUser UserPrincipal userPrincipal) {
		try {
			return ResponseEntity.ok(this.authorService.getAuthorPublicDto(authorId, userPrincipal));
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}
}
